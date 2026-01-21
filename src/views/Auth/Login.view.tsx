import { CustomButton } from '@/components/custom-button.component';
import { CustomInput } from '@/components/custom-input.component';
import { SvgLoader } from '@/components/svg-loader.component';
import { authRoutes } from '@/constants';
import { authSchema } from '@/schemas';
import { useAuthStore } from '@/stores';
import { LoginFormData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function LoginView() {
  SvgLoader.preload('spinner');

  const { t } = useTranslation('auth');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authSchema.loginSchema),
    defaultValues: {
      identifier: 'rasool', // default value
      password: 'Pass1234', // default value
      remember: false,
    },
  });

  const login = useAuthStore((s) => s.login);
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success(t('login.success'));
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      console.error('error :', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t('login.failureFallback'),
      );
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl text-gray-900 dark:text-gray-100">
              {t('login.title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('login.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Controller //TODO move to independent component
                name="identifier"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label={t('login.identifierLabel')}
                    autoComplete="username"
                    hasError={!!errors.identifier}
                    errorText={errors.identifier?.message}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    type="password"
                    label={t('login.passwordLabel')}
                    autoComplete="current-password"
                    hasError={!!errors.password}
                    errorText={errors.password?.message}
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => {
                    const { value, onChange, ...rest } = field;
                    return (
                      <input
                        {...rest}
                        id="remember-me"
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                    );
                  }}
                />
                <label
                  htmlFor="remember-me"
                  className=" "
                >
                  {t('login.rememberMe')}
                </label>
              </div>

              <Link
                to={authRoutes?.forgotPassword?.path as string}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                aria-label={t('login.aria.forgotPassword')}
              >
                {t('login.forgotPassword')}
              </Link>
            </div>

            <CustomButton
              className="w-full"
              type="submit"
              aria-label={t('login.aria.submit')}
              loading={isPending}
            >
              {t('login.submit')}
            </CustomButton>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('login.signupPrompt')}{' '}
            <Link
              to={authRoutes?.register?.path as string}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              aria-label={t('login.aria.signupLink')}
            >
              {t('login.signupCta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(LoginView);
