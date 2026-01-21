import { CustomButton } from '@/components/custom-button.component';
import { CustomInput } from '@/components/custom-input.component';
import { authRoutes } from '@/constants';
import { authSchema } from '@/schemas';
import { useAuthStore } from '@/stores';
import { RegisterFormData } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function RegisterView() {
  const { t } = useTranslation('auth');

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(authSchema.registerSchema),
  });

  const register = useAuthStore((s) => s.register);
  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success(t('register.success'));
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      console.error('error :', error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          t('register.failureFallback'),
      );
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-900 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl text-gray-900 dark:text-gray-100">
              {t('register.title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('register.subtitle')}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label={t('register.usernameLabel')}
                    autoComplete="username"
                    hasError={!!errors.username}
                    errorText={errors.username?.message}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    label={t('register.emailLabel')}
                    autoComplete="email"
                    hasError={!!errors.email}
                    errorText={errors.email?.message}
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
                    label={t('register.passwordLabel')}
                    autoComplete="new-password"
                    hasError={!!errors.password}
                    errorText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    inputStyle="floatingLabel"
                    type="password"
                    label={t('register.passwordConfirmationLabel')}
                    autoComplete="new-password"
                    hasError={!!errors.confirmPassword}
                    errorText={errors.confirmPassword?.message}
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => {
                    const { value, onChange, ...rest } = field;
                    return (
                      <input
                        {...rest}
                        id="terms"
                        type="checkbox"
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                    );
                  }}
                />
                <label
                  htmlFor="terms"
                  className="block text-sm text-gray-700 dark:text-gray-300"
                >
                  {t('register.termsPrefix')}{' '}
                  {/*TODO add right to left modal later*/}
                  <Link
                    to={authRoutes?.terms?.path as string}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                    aria-label={t('register.aria.terms')}
                  >
                    {t('register.termsLink')}
                  </Link>{' '}
                  {t('register.andConnector')}{' '}
                  <Link
                    to={authRoutes?.privacy?.path as string}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-200"
                    aria-label={t('register.aria.privacy')}
                  >
                    {t('register.privacyLink')}
                  </Link>
                </label>
              </div>
              {errors.terms && (
                <small className="text-red-500 dark:text-red-400">
                  {errors.terms?.message}
                </small>
              )}
            </div>

            <CustomButton
              className="w-full"
              type="submit"
              aria-label={t('register.aria.submit')}
              loading={isPending}
            >
              {t('register.submit')}
            </CustomButton>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {t('register.signinPrompt')}{' '}
            <Link
              to={authRoutes?.login?.path as string}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
              aria-label={t('register.aria.signinLink')}
            >
              {t('register.signinCta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RegisterView);
